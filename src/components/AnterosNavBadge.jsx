import React from 'react';

const AnterosNavBadge = (props) => {
    let navBadges = false;
    if (props.items.badge) {
        const badgeClass = ['label', 'pcoded-badge', props.items.badge.type];

        navBadges = (
            <span className={badgeClass.join(' ')}>
                {props.items.badge.title}
            </span>
        );
    }
    return navBadges;
};

export default AnterosNavBadge;