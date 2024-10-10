import { CoursePart } from "../App";
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <>
        <Part courses={courseParts} />
        </>
)}; 

export default Content; 