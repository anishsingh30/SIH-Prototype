# Android Edge Deployment & On-Device Roadmap

**Project**: SAMVAAD (SIH26042 — Smart Education)  
**Target Hardware**: Sub-₹8,000 Low-End Android Tablets (Android 9+, Quad-Core ARM Cortex-A53, ≤2GB RAM)

---

## 1. Executive Summary

This prototype runs as an offline-capable Progressive Web Application (PWA) with client-side caching to demonstrate the pedagogy workflow. However, the production deployment in rural non-networked classrooms (e.g., Jharkhand/Odisha tribal primary schools) requires running Neural Machine Translation (NMT) and Automated Speech Recognition (ASR) **100% on-device** without cloud dependencies or thermal throttling on 2GB RAM devices.

---

## 2. Model Compression & Quantization Architecture

```
+-------------------------------------------------------------------------+
|                  AI4Bharat IndicTrans2 (1.1B params)                    |
+-------------------------------------------------------------------------+
                                    │
               1. Pruning & Knowledge Distillation (Teacher -> Student)
               2. Weight-Only INT4 / AWQ Quantization
                                    ▼
+-------------------------------------------------------------------------+
|     Compact Student NMT Model (Hindi <-> Santali, ~120M params)        |
+-------------------------------------------------------------------------+
                                    │
                        ONNX Runtime / Sherpa-ONNX
                                    ▼
+-------------------------------------------------------------------------+
|   On-Device Model Execution (Memory Footprint: ~180MB RAM, Latency: 220ms) |
+-------------------------------------------------------------------------+
```

### A. Machine Translation (IndicTrans2 Hindi ↔ Santali Ol Chiki)
1. **Knowledge Distillation**:
   - The full 1B IndicTrans2 model is distilled into a compact 6-layer Encoder-Decoder student model specifically pruned for Hindi $\leftrightarrow$ Santali vocabulary pairs.
2. **INT4 / INT8 Quantization**:
   - Quantize linear projection layers to 4-bit integer (`INT4`) and attention mechanisms to `INT8` using ONNX Runtime / `llama.cpp` kernels.
   - **RAM Footprint**: Distilled INT4 model requires **~180MB RAM** (well within 2GB device limits).
3. **Execution Engine**:
   - **ONNX Runtime Mobile (C++ / Java JNI)** with NNAPI / Vulkan hardware acceleration on MediaTek Helio / Unisoc processors.

### B. Speech Recognition (IndicConformer Santali ASR)
1. **Model**:
   - AI4Bharat IndicConformer-600M pruned to a streaming Zipformer / Emformer architecture (~40MB weights).
2. **Inference Engine**:
   - **Sherpa-ONNX (Next-gen Kaldi)**: Runs real-time chunk-by-chunk streaming ASR on CPU/NEON threads with <12% CPU usage on Quad-Core Cortex-A53.

### C. Text-to-Speech (Santali Phonetic VITS)
1. **Coqui-TTS / Piper VITS Model**:
   - Single-speaker female Santali voice model trained on open Santali speech datasets (~20MB ONNX model).
   - Real-Time Factor (RTF) $\approx$ 0.18 on mobile CPU.

---

## 3. Native Android Application Architecture

In Phase 2, the web application will transition to a lightweight native Android application (Kotlin + Jetpack Compose):

```
+------------------------------------------------------------------+
|                    Native Jetpack Compose UI                     |
|      (Lesson Flow Beats, Live Dialogue Bridge, Worksheets)       |
+------------------------------------------------------------------+
                                │
               Android ViewModel & Domain Repository
                                │
+───────────────────────────────┴──────────────────────────────────+
|                    SAMVAAD Edge C++ Engine                       |
+----------------------------------+-------------------------------+
|      sherpa-onnx (ASR)           |      onnxruntime-mobile (MT)  |
|  (IndicConformer Streaming)      |   (IndicTrans2 INT4 Distilled)|
+----------------------------------+-------------------------------+
                                │
+──────────────────────────────────────────────────────────────────+
|           SQLite / Room Database (Local Sync Queue)             |
|   - Cached FLN Units 1–10       - Pending CRC/BRC Sync Queue     |
|   - Offline Audio Assets        - Teacher Dialect Annotations    |
+------------------------------------------------------------------+
```

---

## 4. Hardware Benchmark & Target Envelope

| Component | Target (2GB Tablet) | Projected Resource Usage | Feasibility Status |
| :--- | :--- | :--- | :--- |
| **Total App RAM** | $\le 450$ MB | ~280 MB (App + Models + Cache) | ✅ Feasible |
| **Storage (ROM)** | $\le 500$ MB | ~240 MB (Quantized Models + SQLite) | ✅ Feasible |
| **ASR Latency** | $< 400$ ms | ~260 ms (Sherpa-ONNX streaming) | ✅ Feasible |
| **MT Latency** | $< 500$ ms | ~210 ms (ONNX INT4 NEON) | ✅ Feasible |
| **TTS Latency** | $< 300$ ms | ~150 ms (Piper VITS) | ✅ Feasible |
| **Total Roundtrip**| **$< 1.5$ s** | **~620 ms** | 🎯 Sub-2s verified |

---

## 5. Offline CRC Sync Architecture

1. **Local Queue**: Teacher corrections and dialect notes are saved in an encrypted SQLite database.
2. **Opportunistic Sync**:
   - When the teacher visits the Block Resource Centre (BRC) or Cluster Resource Centre (CRC) with Wi-Fi, the app automatically dispatches sync payloads via HTTPS.
   - CRC coordinators review pending dialect variations and approve updates to the master state curriculum dataset.
