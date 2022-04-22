type BlogLayoutProps = {
  children?: React.ReactNode
}
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <>
      <Toaster />
      <header className="container-lg bg-blue-500">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-5xl ml-10 mt-5 text-white">
            <Link to={routes.home()}>Redwood Blog</Link>
          </div>
          <div className="text-base mr-10 mt-5 text-white text-right align-middle">
          {isAuthenticated ? (
              <div>
                <span> {currentUser.email}</span>
                <button type="button" onClick={logOut} className="ml-5 w-24 h-10 rounded-sm bg-white text-blue-500 items-center">
                  Logout
                </button>
              </div>
            ) : (
              <Link to={routes.login()}>Login</Link>
            )}

        </div>
        </div>
        <div className="flex-between">
            <h1>

            </h1>

          </div>
          <div class="flex flex-row space-x-4 text-white text-sm font-bold leading-6 ml-10">
            <div className="w-14 h-14 rounded-lg flex items-center justify-center"><Link to={routes.home()}>Home</Link></div>
            <div className="w-14 h-14 rounded-lg flex items-center justify-center"><Link to={routes.contact()}>Contact</Link></div>
            <div className="w-14 h-14 rounded-lg flex items-center justify-center"><Link to={routes.about()}>About</Link></div>
          </div>
      </header>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
