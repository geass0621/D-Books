import ThemeController from "./ThemeSelector"

const MainNavigation = () => {
  return <>
    <header className="flex p-8 m-auto justify-center">
      <div className="navbar max-w-5xl h-0.5 bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-lg">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
        </div>
        <div className="navbar-end">
          <ThemeController />
        </div>
      </div>
    </header>
  </>
}

export default MainNavigation