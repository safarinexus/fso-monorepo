import { CoursePart } from '../App'; 

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}` 
    ); 
};

const Part = ({ courses }: { courses:CoursePart[] }) => (
    <>
    {courses.map(course => {
        switch (course.kind) {
            case "basic": 
                return (
                    <div>
                        <h3>{course.name} has {course.exerciseCount}</h3>
                        <p>{course.description}</p>
                    </div>
                ); 
            case "group": 
                return (
                    <div>
                        <h3>{course.name} has {course.exerciseCount}</h3>
                        <p>project exercises: {course.groupProjectCount}</p>
                    </div>
                ); 
            case "background": 
                return (
                    <div>
                        <h3>{course.name} has {course.exerciseCount}</h3>
                        <p>{course.description}</p>
                        <p>background material: {course.backgroundMaterial}</p>
                    </div>
                ); 
            case "special": 
                return (
                    <div>
                        <h3>{course.name} has {course.exerciseCount}</h3>
                        <p>{course.description}</p>
                        <p>required skills: {course.requirements.map((x, index) => {
                            if (index===0) {
                                return (x); 
                            } else {
                                return (", " + x);
                            }
                        })}
                        </p>
                    </div>
                );
            default: 
                return (
                    <div> 
                        <h3>{assertNever(course)}</h3>
                    </div>
                );
        }
    })}
    </>
); 

export default Part;