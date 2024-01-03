export const AlertComponent = ({Alert}) => {
  return (
    <div className={`${Alert.error ? "from-red-400 to-red-600":"from-sky-400 to-sky-600"} bg-gradient-to-br 
    text-center rounded-xl uppercase text-white font-bold text-sm my-10 p-5`}>
        {Alert.msg}
    </div>
  )
}
