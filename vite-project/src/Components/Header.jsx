import logo from  "../assets/logo.png"

export default function Header() {
  return (
    <header className="header-container">
      <img src={logo} className="logo" alt="logo image displayng chef head" />
      <h1> Chef Claude </h1>
    </header>
  )
}
