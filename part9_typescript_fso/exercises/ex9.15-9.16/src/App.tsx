import Header from './components/Header'; 
import Content from './components/Content'; 
import Total from './components/Total';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesc extends CoursePartBase {
  description: string; 
}  

interface CoursePartBasic extends CoursePartDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDesc {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDesc {
  requirements: string[]; 
  kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    }
  ];

  const totalExercises: number = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    /*Old component
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
    */
   <div>
    <Header courseName={courseName} /> 
    <Content courseParts={courseParts}/> 
    <Total total={totalExercises} />
   </div>
  );
};

export default App; 