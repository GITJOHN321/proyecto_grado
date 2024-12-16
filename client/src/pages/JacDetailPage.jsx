import { Link, useParams } from "react-router-dom";
function JacDetailPage(){
    const { id } = useParams();
    return(
        <div>{id}</div>
    )
}

export default JacDetailPage