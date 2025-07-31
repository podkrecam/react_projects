function Section({ children, className = "" }) {
  return <section className={`${className} h-screen`}>{children}</section>;
}

export default Section;
