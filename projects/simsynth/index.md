---
title: SIMSynth
year: 2024
order: 1
links:
  - label: GitHub
    url: https://github.com/lipsumar/simsynth
---

A simple Arduino synthesizer. SIMSynth does FM synthesis and sample playback on an Arduino, driven over MIDI. It uses the Mozzi library and accepts samples converted from WAV files into raw headers.

The synth has 3 voices, each coded with Mozzi. Each voice can be tweaked live using 3 potentiometers, and a switch lets you cycle through short, medium, and long envelopes. In the center of the panel sits a beat box with 3 samples — kick, clap, and hi-hat — whose patterns change randomly each time an instrument is toggled on, giving the whole thing a generative, ever-shifting rhythm. The synth also outputs a sync signal and has a headphone jack.

It's my very first synth and serious C++ project. I learned a lot and it doesn't sound too bad for a 3D printed synth!
