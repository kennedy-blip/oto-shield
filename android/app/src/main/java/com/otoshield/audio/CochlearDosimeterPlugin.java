package com.otoshield.audio;
/** PCM sample math only. SPL requires device-specific microphone calibration. */
public final class CochlearDosimeterPlugin {
  public static double rms(short[] samples) {
    if (samples.length == 0) return 0;
    double sum = 0;
    for (short sample : samples) { double x = sample / 32768.0; sum += x*x; }
    return Math.sqrt(sum / samples.length);
  }
}
