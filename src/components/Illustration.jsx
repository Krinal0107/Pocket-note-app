import illustration from '../../public/pocket Notes.png'

export default function Illustration({ className = '' }) {
  return (
    <img
      src={illustration}
      alt="People with a notebook"
      className={className}
    />
  )
}
