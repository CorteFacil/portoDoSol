function BSFooter() {
    return (
    <div className="bg-dark text-secondary p-3 mt-auto" data-bs-theme="dark">
        <hr />
        <footer className="d-flex justify-content-between">
                <span className="d-flex gap-3">
                    <span>© 2026 SWG.com.</span>
                    <span>Todos os direitos reservados.</span>
                </span>
                <span className="d-flex gap-3">
                    <a href="#" className="nav-link">Privacidade</a>
                    <a href="#" className="nav-link">Termos de Uso</a>
                </span>
            </footer>
    </div>
    )
}

export default BSFooter