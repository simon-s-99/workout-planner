interface TestProps {
  name: string;
}

const Test: React.FC<TestProps> = ({ name }) => {
  return (
    <div className="Test">
      <h1>{name}</h1>
    </div>
  );
};

export default Test;
