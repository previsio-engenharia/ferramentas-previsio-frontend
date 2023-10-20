import { Button } from "@mui/material";
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';


const ExternalLinkButton = ({ link, text }) => {
    const openInNewTab = () => {
        const newTab = window.open(link, '_blank');
        newTab.focus();
    };

    return (
        <Button onClick={openInNewTab} startIcon={<LaunchRoundedIcon/>}>
            {text}
        </Button>
    );
};

export default ExternalLinkButton;
