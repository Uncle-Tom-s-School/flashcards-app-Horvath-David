import { useEffect, useState } from "react"

interface Card {
  question: string
  answer: string
  points: number
}

function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [cardI, setCardI] = useState(0)
  const [reveal, setReveal] = useState(false)

  const [finished, setFinished] = useState(false)

  const currentCard = cards[cardI]

  async function fetchData() {
    const res = await fetch("/cards.json")
    const cards = (await res.json()) as Card[]

    setCards(cards)
  }

  useEffect(() => {
    fetchData()
  }, [])

  function handleClick(success: boolean) {
    setReveal(false)
    if (cardI < cards.length - 1) {
      setCardI((prev) => prev + 1)
    } else {
      setFinished(true)
    }
  }

  function handleFlip() {
    setReveal(true)
  }

  if (!cards.length) {
    return (
      <main className='w-screen h-screen overflow-hidden bg-linear-to-br from-(--bg-color-2) via-(--bg-color-1) to-(--bg-color-2) flex flex-col p-4 gap-4 justify-center items-center text-white text-2xl font-bold'>
        Loading...
      </main>
    )
  }

  if (finished) {
    return (
      <main className='w-screen h-screen overflow-hidden bg-linear-to-br from-(--bg-color-2) via-(--bg-color-1) to-(--bg-color-2) flex flex-col p-4 gap-4 justify-center items-center text-white text-2xl font-bold'>
        Kész!
      </main>
    )
  }

  return (
    <main className='w-screen h-screen overflow-hidden bg-linear-to-br from-(--bg-color-2) via-(--bg-color-1) to-(--bg-color-2) flex flex-col p-4 gap-4'>
      <div className='flex-2 flex flex-col md:justify-center'>
        <button
          className='bg-white py-4 px-6 font-bold text-lg rounded-xl cursor-pointer md:fixed md:bottom-4 md:right-4'
          onClick={() => window.location.reload()}
        >
          Új gyakorlás indítása
        </button>
      </div>
      <div
        className='flex-5 w-full rounded-xl h-full bg-(--green) flex justify-center items-center p-16 text-2xl font-semibold text-white relative text-center md:max-w-xl md:mx-auto md:max-h-1/3'
        onClick={() => !reveal && handleFlip()}
      >
        {currentCard.question}

        {reveal && (
          <div className='bg-white flex flex-col absolute rounded-xl w-full h-full'>
            <div className='w-full py-1 rounded-xl bg-(--green) text-center'>
              {cardI + 1}
            </div>
            <div className='w-full h-full flex flex-col justify-evenly'>
              <span className='text-black text-center'>
                {currentCard.answer}
              </span>

              <div className='w-full flex justify-evenly'>
                <div
                  className='text-(--green) cursor-pointer text-base px-4 py-2 border rounded-xl'
                  onClick={() => handleClick(true)}
                >
                  Eltaláltam
                </div>
                <div
                  className='text-(--red) cursor-pointer text-base px-4 py-2 border rounded-xl'
                  onClick={() => handleClick(false)}
                >
                  Nem sikerült
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='flex-2 flex flex-col items-center justify-end gap-2 md:justify-start md:max-w-xl w-full md:mx-auto'>
        <span className='text-white font-bold text-2xl'>
          {cardI + 1} / {cards.length}
        </span>
        <div className='bg-white h-6 rounded-xl w-full'>
          <div
            style={{ width: `${((cardI + 1) / cards.length) * 100}%` }}
            className='h-full bg-(--green) rounded-xl'
          ></div>
        </div>
      </div>
    </main>
  )
}

export default App
