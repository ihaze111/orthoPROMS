import React from 'react';

function NHSFooter(props) {
    return (
        <footer role="contentinfo">
            <div className="nhsuk-footer" id="nhsuk-footer">
                <div className="nhsuk-width-container">
                    <h2 className="nhsuk-u-visually-hidden">Support links</h2>
                    <ul className="nhsuk-footer__list">
                        <li className="nhsuk-footer__list-item"><a className="nhsuk-footer__list-item-link"
                                                                   href="/About">About</a>
                        </li>
                        <li className="nhsuk-footer__list-item"><a className="nhsuk-footer__list-item-link"
                                                                   href="https://github.com/ihaze111/orthoPROMS">Github</a>
                        </li>
                    </ul>
                    <p className="nhsuk-footer__copyright">Created by Charlie Cowan, Menghang Hao, Haze Al-Johary</p>
                </div>
            </div>
        </footer>
    );
}

export default NHSFooter;
