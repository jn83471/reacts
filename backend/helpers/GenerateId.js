const GenerateId=()=>{
    const random=Math.random().toString(32).substring(2);
    const daten= Date.now().toString(32);

    return random+daten;
}
export default GenerateId;