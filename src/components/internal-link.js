// componente com única função de encapsular um Link do MUI com um Link do Next
// utilizar apenas para links internos da aplicação
import { Link } from "@mui/material";
import NextLink from "next/link";
export default function InternalLink({ href, children }){
    return(
        <Link href={href} component={NextLink} underline="none">
            {children}
        </Link>
    )
}