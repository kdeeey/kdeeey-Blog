"use client";

export default function SpeechBubble({ text, className }: { text: string; className?: string }) {
  return (
    <div className={"flex flex-col items-center " + (className ?? "")}>
      <div className="bg-white border-2 border-black shadow-[2px_2px_0_#000] px-3.5 py-2.5 font-pixel text-[9px] text-black whitespace-nowrap leading-relaxed">
        {text}
      </div>
      <div className="w-0 h-0 border-l-[9px] border-r-[9px] border-t-[11px] border-l-transparent border-r-transparent border-t-black -mt-px" />
      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white -mt-[11px]" />
    </div>
  );
}
