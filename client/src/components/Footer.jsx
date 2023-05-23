import React from 'react';
import classes from "../styles/footer.module.css";

/**
 * "Подвал" сайта. Располагается внизу страницы
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => {
    return (
        <section className={classes.footer}>
            <hr/>
            <p>INVOIDER Productions</p>
        </section>
    );
};

export default Footer;