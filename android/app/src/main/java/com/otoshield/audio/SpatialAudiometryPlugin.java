package com.otoshield.audio;
import android.content.Context;
import android.media.AudioDeviceInfo;
import android.media.AudioManager;
/** Hardware routing helper. This class is not yet wired to a Capacitor plugin. */
public final class SpatialAudiometryPlugin {
  public static boolean hasHeadphones(Context context) {
    AudioManager audio = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
    for (AudioDeviceInfo device : audio.getDevices(AudioManager.GET_DEVICES_OUTPUTS)) {
      int type = device.getType();
      if (type == AudioDeviceInfo.TYPE_WIRED_HEADPHONES || type == AudioDeviceInfo.TYPE_WIRED_HEADSET || type == AudioDeviceInfo.TYPE_BLUETOOTH_A2DP) return true;
    }
    return false;
  }
}
