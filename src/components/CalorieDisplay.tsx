
type CalorieDisplayProps = {
    calories: number,
    text: string
}

export default function CalorieDisplay({calories, text} : CalorieDisplayProps) {
  return (
    <p className="text-slate-700 font-bold rounded-full grid grid-cols-1 gap-3 text-center">
        <span className="font-black text-3xl text-slate-700">{calories}</span>
            {text}
    </p>
  )
}
