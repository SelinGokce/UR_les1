import Image from 'next/image'

export default function ProjectPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-100">Beat Bliss</h1>
      <div className="flex flex-col gap-6">
        <div className="bg-slate-800 p-6 rounded-lg">
          <p className="text-slate-200">
            Een vinyl album genaamd Beat Bliss door een fictief artiest Evely Evelynn.
            Ik kreeg niet alleen de kans om een vinylhoes helemaal zelf te ontwerpen, maar ook om te werken met 3D-modellen en AR die geactiveerd wordt wanneer de hoes gescand wordt.
          </p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg">
          <h1 className="text-xl font-bold mb-6 text-slate-100">Gebruikte Tools</h1>
          <ul className="list-disc pl-5 text-slate-200 space-y-2">
            <li>Adobe Dimensions</li>
            <li>Adobe Photoshop</li>
            <li>Adobe Illustrator</li>
            <li>Phone Photography</li>
          </ul>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <a href="/beatbliss/mockupbeatbliss.png" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:scale-110 transition-transform inline-block">
                <Image
                  src="/beatbliss/mockupbeatbliss.png"
                  alt="Beat Bliss album mockup"
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </a>
            </div>
            <div className="flex-1">
              <a href="/beatbliss/album.jpeg" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:scale-110 transition-transform inline-block">
                <Image
                  src="/beatbliss/album.jpeg"
                  alt="Beat Bliss album"
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </a>
            </div>
            <div className="flex-1">
              <a href="/beatbliss/posterbb.png" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:scale-110 transition-transform inline-block">
                <Image
                  src="/beatbliss/posterbb.png"
                  alt="Beat Bliss album"
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
