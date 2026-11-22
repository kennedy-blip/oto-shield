let context, active = [], noiseGain
export function stopAudio(fadeSeconds = 0) {
  const nodes = active; active = []
  if (fadeSeconds > 0 && noiseGain && context) {
    const gain = noiseGain.gain
    gain.cancelScheduledValues(context.currentTime)
    gain.setValueAtTime(gain.value, context.currentTime)
    gain.linearRampToValueAtTime(0, context.currentTime + fadeSeconds)
    nodes.forEach(n => { try { n.stop(context.currentTime + fadeSeconds + .05) } catch {} })
  } else nodes.forEach(n => { try { n.stop() } catch {} })
  noiseGain = null
}
export async function tone(frequency=1000, ear='left', level=25, duration=0.8, warble=false){
 stopAudio(); context ||= new AudioContext(); await context.resume(); const o=context.createOscillator(), g=context.createGain(), p=context.createStereoPanner();
 o.frequency.value=Math.min(frequency, context.sampleRate / 2 - 100); p.pan.value=ear==='left'?-1:ear==='right'?1:0; g.gain.setValueAtTime(0,context.currentTime); g.gain.linearRampToValueAtTime(Math.min(.06, .003*Math.pow(10,level/60)),context.currentTime+.04); g.gain.setTargetAtTime(0,context.currentTime+duration-.08,.025); o.connect(g).connect(p).connect(context.destination); if(warble){const l=context.createOscillator(), d=context.createGain();l.frequency.value=5;d.gain.value=frequency*.02;l.connect(d).connect(o.frequency);l.start();l.stop(context.currentTime+duration);active.push(l)} o.start();o.stop(context.currentTime+duration);active.push(o)
}
export async function noise(frequency=6400, kind='pink') {
 stopAudio(); context ||= new AudioContext(); await context.resume();
 const b=context.createBuffer(1,context.sampleRate*4,context.sampleRate), data=b.getChannelData(0)
 let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,brown=0
 for(let i=0;i<data.length;i++){
   const white=Math.random()*2-1
   if(kind==='brown'){brown=(brown+.02*white)/1.02;data[i]=brown*2.5}
   else {b0=.99886*b0+white*.0555179;b1=.99332*b1+white*.0750759;b2=.969*b2+white*.153852;b3=.8665*b3+white*.3104856;b4=.55*b4+white*.5329522;b5=-.7616*b5-white*.016898;data[i]=(b0+b1+b2+b3+b4+b5+b6+white*.5362)*.11;b6=white*.115926}
 }
 const source=context.createBufferSource();source.buffer=b;source.loop=true;const f=context.createBiquadFilter();f.type='notch';f.frequency.value=Math.min(frequency,context.sampleRate/2-100);f.Q.value=1.4;const f2=context.createBiquadFilter();f2.type='notch';f2.frequency.value=f.frequency.value;f2.Q.value=1.4;noiseGain=context.createGain();noiseGain.gain.value=.12;source.connect(f).connect(f2).connect(noiseGain).connect(context.destination);source.start();active.push(source)
}
export const safeMinutes = db => 480*Math.pow(2,(85-db)/3)
export const oshaMinutes = db => 480*Math.pow(2,(90-db)/5)
