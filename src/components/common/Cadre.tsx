interface CadreProps {
    src: string;
    alt: string;
    title: string;
    txt: string;
  }
  
  export default function Cadre({ src, alt, title, txt }: CadreProps) {
    return (
      <div className="border-2 border-white/50 shadow-[0_0_10px_5px_rgba(255,255,255,0.5),inset_0_0_5px_5px_rgba(255,255,255,0.3)] p-2 rounded-lg width-[200px] text-center p-[20] w-[300] min-h-[200] card">
        <img src={src} alt={alt} width={48} height={48} className="m-auto pb-[15]" />
        <h2 className="pb-[15]" >{title}</h2>
        <p>{txt}</p>
      </div>
    );
  }