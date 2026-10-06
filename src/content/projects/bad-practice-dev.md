---
title: "Bad Practice Dev"
description: "Challenge digital forensics tentang malware yang mengenkripsi proyek web pada disk image; analisis artefak digunakan untuk menemukan kunci dan memulihkan berkas."
stack: ["Autopsy", "Disk Forensics", "AES-256", "Linux"]
challenge: "https://drive.google.com/file/d/1H3dum01rbwTK75f-uquzPtfiyx1pw3In/view?usp=drive_link"
challengeLabel: "Download disk image"
featured: true
status: "archived"
---

## Deskripsi Challenge

Faz adalah seorang junior web developer yang sedang tekun berlatih membuat situs web menggunakan HTML, CSS, dan JavaScript. Saat sedang mencari inspirasi template di internet, ia tidak sengaja menekan tautan mencurigakan yang mengunduh berkas asing ke komputernya. Tak lama setelah berkas tersebut dijalankan, seluruh kode proyek web yang ia buat berubah menjadi berkas asing berakhiran `.secret` dan tidak dapat dibuka kembali.

Analisis berkas disk image yang diberikan menggunakan alat forensik seperti Autopsy. Temukan bagaimana serangan tersebut terjadi, dapatkan kunci dekripsinya, dan pulihkan kembali berkas proyek milik Faz untuk menemukan flag.
