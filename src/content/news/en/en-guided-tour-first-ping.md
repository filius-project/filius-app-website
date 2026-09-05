---
locale: en
translationKey: guided-tour-first-ping
slug: guided-tour-first-ping
title: "The first ping, one clear step at a time"
summary: "The new guided tour teaches Filius on iPad through the real interface: two computers, one switch, two cables, clear addresses, and a successful ping."
publishedAt: 2026-09-05
kind: development
topics:
  - First steps
  - Classroom
  - Guided tour
  - Accessibility
readingMinutes: 5
featured: true
---

A blank network canvas can be surprisingly intimidating. Experienced FILIUS users know where to begin, but a student opening a network simulator for the first time must understand the tools, the order of the task, and what a successful result should look like—all at once.

The new guided tour in Filius on iPad is designed to remove that uncertainty without replacing the app with a slideshow. Learners work in the real editor, use the real controls, and finish with a small network that can answer a real simulated ping.

## A complete first network

The practice task now has a result that makes sense:

1. place a sender computer;
2. place a receiver computer;
3. place a network switch;
4. connect both computers to the switch;
5. give the computers clear names and IP addresses;
6. start the simulation;
7. open the command prompt and ping the other computer; and
8. inspect the packet exchange.

This matters because placing one computer and a switch is not yet a network experiment. Two endpoints make the purpose of the cables, addresses, command prompt, and packet trace visible. The learner sees the request leave one computer and receives a concrete response from the other.

## The interface shows exactly what to use

Every action is connected to a high-contrast orange-and-black spotlight. A small animated hand points toward the current target, while the rest of the application is dimmed. The instruction card uses short language such as “Tap the outlined PC button” or “Tap once inside the outlined left box.”

The highlight is not decorative. During a required action, only the highlighted control or placement area accepts a tap. Choosing the wrong device, opening an unrelated menu, dragging the canvas, or placing hardware somewhere else cannot silently take the learner off course. As soon as the requested action is complete, the guide moves to the next target.

The callout also moves to avoid covering the place where the learner needs to work. Highlights follow their controls in full-screen, portrait, landscape, and compact iPad window layouts. Reduced Motion settings remove non-essential movement while preserving the visual guidance.

## Real actions, safe practice

The tour runs in a temporary practice workspace. It does not modify the learner’s current project or trigger normal autosaving. Leaving the tour restores the previous context; completing it records the onboarding result and returns the learner to the app with the basic workflow understood.

Using the real interface was an important design decision. A video can demonstrate a cable. The guided tour lets a learner select the cable tool, choose the endpoints, configure addresses, start the simulation, type a command, and observe the result. Those actions are the knowledge we want students to carry into their first independent exercise.

## Built for beginners, tested like a workflow

The implementation is covered at several levels. Geometry tests check that highlights remain aligned when an iPad app window has a non-zero screen position. Interface tests verify both the regular editor and compact window layout, including the visible spotlight and blocked unrelated controls. A complete automated run follows the same path as a learner—from the empty canvas through both computer configurations to the ping and packet exchange.

The guided tour is currently part of the release-preparation build. Final availability still depends on the public Filius on iPad release, but the learning flow itself is now implemented and being prepared with the rest of the first release.
