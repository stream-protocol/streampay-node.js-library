interface ContainerProps {
  children: React.ReactNode; // The content to be placed inside the container
}

const Container: React.FC<ContainerProps> = ({
  children
}) => {
  return ( 
    <div className="mx-auto max-w-7xl">
      {children} {/* Render the children inside the container */}
    </div>
   );
};

export default Container;
