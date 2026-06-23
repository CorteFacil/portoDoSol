import { NavLink } from "react-router-dom"

function BSHeader() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container p-2">
                <NavLink to="/" end className='navbar-brand'>Sistema de Gestão de Hotelaria</NavLink>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav" me-auto>
                        <NavLink to="/admin" end className={({ isActive }: { isActive: boolean }) => isActive ? 'nav-link disabled' : 'nav-link' }>Admin</NavLink>
                        {/* <NavLink to="/admin/quartos" end className={({ isActive }: { isActive: boolean }) => isActive ? 'nav-link disabled' : 'nav-link' }>Processos de Négocio</NavLink> */}
                        <NavLink to="/admin/tipos-de-quarto" end className={({ isActive }: { isActive: boolean }) => isActive ? 'nav-link disabled' : 'nav-link' }>Relatórios</NavLink>
                        <NavLink to="/admin/hospedes" end className={({ isActive }: { isActive: boolean }) => isActive ? 'nav-link disabled' : 'nav-link' }>Contato</NavLink>
                    </ul>

                </div>
        </div>
    </nav>
    )

}

export default BSHeader