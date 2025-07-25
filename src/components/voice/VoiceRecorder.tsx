'use client';
import {
  useRef,
  useState,
  useEffect,
  useMemo,
  useId,
  useCallback
} from 'react';
import { Play, Pause, Mic, RotateCcw, X, Power } from 'lucide-react';

export default function VoiceRecorder() {
  /* ---------- الحالات ---------- */
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [duration, setDuration] = useState(0);
  const [sent, setSent] = useState(false);

  /* ---------- ارتفاعات الأشرطة (ثابتة لكل مثيل) ---------- */
  const barId = useId();
  const baseHeights = useMemo(
    () => Array.from({ length: 20 }, () => 8 + Math.floor(Math.random() * 17)),
    []
  );

  /* ---------- تأجيل العمليات إلى ما بعد الـ Hydrate ---------- */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [heights, setHeights] = useState<number[]>(baseHeights);

  /* ---------- الرسوم المتحركة عند التسجيل ---------- */
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isRecording && mounted) {
      t = setInterval(() => {
        setHeights(prev =>
          prev.map(h => Math.max(4, Math.min(32, h + (Math.random() - 0.5) * 6)))
        );
      }, 150);
    }
    return () => clearInterval(t);
  }, [isRecording, mounted]);

  /* ---------- Refs ---------- */
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /* ---------- دعم المتصفح ---------- */
  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('❌ متصفحك لا يدعم تسجيل الصوت.');
    }
  }, []);

  /* ---------- وظائف التحكم ---------- */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = e => audioChunksRef.current.push(e.data);
      recorder.onstop = () => {
        const url = URL.createObjectURL(
          new Blob(audioChunksRef.current, { type: 'audio/webm' })
        );
        setAudioURL(url);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      setIsRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } catch {
      alert('❌ حدث خطأ أثناء الوصول إلى الميكروفون.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reset = () => {
    setAudioURL(null);
    setSent(false);
    setDuration(0);
  };

  const send = () => setSent(true);

  /* ---------- التشغيل / الإيقاف ---------- */
  const togglePreview = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !mounted) return;

    if (isPlayingPreview) {
      audio.pause();
    } else {
      audio.onended = () => setIsPlayingPreview(false);
      audio.play().catch(() => {});
    }
    setIsPlayingPreview(p => !p);
  }, [isPlayingPreview, mounted]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.onended = () => setIsPlayingPreview(false);
  }, [audioURL]);

  /* ---------- تنسيق الوقت ---------- */
  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  /* ---------- الأشرطة ---------- */
  const bars = heights.map((h, i) => (
    <div
      key={`${barId}-${i}`}
      className="w-1.5 rounded-full bg-gray-50 dark:bg-green-500 transition-all duration-200"
      style={{ height: `${h}px` }}
    />
  ));

  /* ---------- JSX ---------- */
  return (
    <div className="flex flex-col items-center justify-center z-40">
      {/* أثناء التسجيل */}
      {isRecording && (
        <div className="flex items-center gap-2 h-[40px] text-green-400 border-green-400 bg-gradient-to-b from-green-600 to-green-700 dark:from-gray-900 dark:to-gray-950 dark:text-green-400 dark:border-green-400/40 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full px-6 py-3 shadow-xl">
          <div className="flex gap-2 items-end">{bars}</div>
          <span className="text-green-50 dark:text-green-500 font-semibold">
            {fmt(duration)}
          </span>
          <button onClick={stopRecording} className="text-green-50 dark:text-green-500">
            <Pause size={24} />
          </button>
          <button
            onClick={() => {
              stopRecording();
              reset();
            }}
            className="text-green-50 dark:text-green-500"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* زر بدء التسجيل */}
      {!isRecording && !audioURL && (
        <button
          onClick={startRecording}
          className="w-9 h-9 rounded-full text-green-200 border-green-400 bg-gradient-to-b from-green-600 to-green-700 dark:from-gray-900 dark:to-gray-950 dark:text-green-400 dark:border-green-400/40 hover:bg-blue-100 dark:hover:bg-blue-900/30 flex items-center justify-center transition"
        >
          <Mic size={24} />
        </button>
      )}

      {/* معاينة التسجيل */}
      {audioURL && !sent && (
        <div className="flex items-center gap-3 rounded-full px-2 py-2 text-green-400 border-green-400 bg-gradient-to-b from-green-600 to-green-700 dark:from-gray-900 dark:to-gray-950 dark:text-green-400 dark:border-green-400/40 hover:bg-blue-100 dark:hover:bg-blue-900/30">
          <button onClick={togglePreview} className="text-green-50 dark:text-green-500">
            {isPlayingPreview ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <div className="flex gap-1 items-end">
            {baseHeights.slice(0, 7).map((h, i) => (
              <div
                key={`prev-${i}`}
                className="w-1 bg-gray-50 dark:bg-green-500 rounded-full"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <span className="text-sm text-green-50 dark:text-green-500">
            {fmt(duration)}
          </span>
          <button onClick={send} className="text-green-50 dark:text-green-500">
            <Power size={20} />
          </button>
          <button onClick={reset} className="text-green-50 dark:text-green-500">
            <RotateCcw size={20} />
          </button>
          {/* يُظهر <audio> فقط بعد الـ Hydrate */}
          {mounted && <audio ref={audioRef} src={audioURL} className="hidden" />}
        </div>
      )}

      {/* بعد الإرسال */}
      {sent && audioURL && (
        <div className=" text-green-200 border-green-400 bg-gradient-to-b from-green-600 to-green-700 dark:from-gray-900 dark:to-gray-950 dark:text-green-400 dark:border-green-400/40 hover:bg-blue-100 dark:hover:bg-blue-900/30  rounded-2xl rounded-bl-none px-4 py-2 self-end shadow">
          <div className="flex items-center gap-2">
            <button onClick={togglePreview} className="text-green-50 dark:text-green-500">
              {isPlayingPreview ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <div className="flex gap-1 items-end">
              {baseHeights.slice(0, 25).map((h, i) => (
                <div
                  key={`sent-${i}`}
                  className="w-1 bg-gray-50 dark:bg-green-500 rounded-full"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            <span className="text-xs text-green-50 dark:text-green-500">{fmt(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}