import { Button } from "@mui/material";

async function mandaDb(){
    const res = await fetch('/api/salva-consultas-db', {
        method: 'POST',
        //body: JSON.stringify(dataForm),
        headers: { 'Content-Type': 'application/json' }
    });
}

function Home(){
    return(
        <section>
            Pág teste
            <Button onClick={mandaDb}>
                manda
            </Button>
        </section>
    )
}
export default Home;