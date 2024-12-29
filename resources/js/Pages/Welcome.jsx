import { Head } from "@inertiajs/react";
import PortfolioNav from "@/Components/Welcome/PortfolioNav";
import PortfolioHero from "@/Components/Welcome/PortfolioHero";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bem-vindo(a)" />
            <PortfolioNav auth={auth}></PortfolioNav>
            <PortfolioHero></PortfolioHero>
        </>
    );
}