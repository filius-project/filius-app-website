---
locale: en
translationKey: contact-form-architecture
slug: contact-form-behind-the-scenes
title: "Behind the contact form: a small service instead of a long detour"
summary: "Why the support form uses a private first-party service and deliberately avoids uploads, a database, and third-party CAPTCHA."
publishedAt: 2026-08-10
kind: development
topics:
  - Support
  - Privacy
  - Infrastructure
readingMinutes: 4
---

A contact form looks simple: address, topic, message, send. That small interface still requires an important architecture decision. Filius on iPad does not use an external form provider or third-party CAPTCHA.

## A short, controlled route

The browser submits the form to the same website. The web container forwards only `/api/contact` to a separate contact service on a private Docker network. That service validates the input and relays an accepted message through the authenticated support mailbox.

The contact service has no public port. Only the web container can reach it.

## Deliberately little data

The form has no file upload and no database of its own. It processes only the details needed for the support request. A hidden field slows simple bots; size limits, origin checks, and a short-lived rate-limit identifier add further protection.

The visitor’s email address becomes the reply address. It does not need to be copied into server logs or a second storage system.

## Why a separate service?

A static website can be delivered quickly and safely, but it must never contain SMTP credentials. The separate service keeps those credentials at runtime on the server while the public web container remains small and read-only.

The result is not a spectacular feature. It is deliberately quiet infrastructure: support should be reachable without introducing unnecessary systems and data trails.
