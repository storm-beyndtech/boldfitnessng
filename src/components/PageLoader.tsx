import logo from "../assets/bold-fitness-logo-fav.svg";

export default function PageLoader() {
  return (
    <section className="flex items-center justify-center h-screen bg-bg">
      <div className="flex flex-col gap-5">
        <img src={logo} alt="logo" className="h-10 w-auto" />
        <span className="flex w-4 h-[2px] rounded-full slideLoad bg-brandBlue3"></span>
      </div>
    </section>
  );
}
