// @flow

import * as React from "react";
import {NavLink, withRouter} from "react-router-dom";

import {
    Site,
    Nav,
    Grid,
    List,
    Button,
    RouterContextProvider,
} from "tabler-react";

import type {NotificationProps} from "tabler-react";

type Props = {|
    +children: React.Node,
|};

type State = {|
    notificationsObjects: Array<NotificationProps>,
|};

type subNavItem = {|
    +value: string,
    +to?: string,
    +icon?: string,
    +LinkComponent?: React.ElementType,
    +useExact?: boolean,
|};

type navItem = {|
    +value: string,
    +to?: string,
    +icon?: string,
    +active?: boolean,
    +LinkComponent?: React.ElementType,
    +subItems?: Array<subNavItem>,
    +useExact?: boolean,
|};

const navBarItems: Array<navItem> = [
    {
        value: "Home",
        to: "/",
        icon: "home",
        LinkComponent: withRouter(NavLink),
        useExact: true,
    },
    {
        value: "Interface",
        icon: "box",
        subItems: [
            {
                value: "Cards Design",
                to: "/cards",
                LinkComponent: withRouter(NavLink),
            },
            {value: "Charts", to: "/charts", LinkComponent: withRouter(NavLink)},
            {
                value: "Pricing Cards",
                to: "/pricing-cards",
                LinkComponent: withRouter(NavLink),
            },
        ],
    },
    {
        value: "Components",
        icon: "calendar",
        subItems: [
            {value: "Maps", to: "/maps", LinkComponent: withRouter(NavLink)},
            {value: "Icons", to: "/icons", LinkComponent: withRouter(NavLink)},
            {value: "Store", to: "/store", LinkComponent: withRouter(NavLink)},
            {value: "Blog", to: "/blog", LinkComponent: withRouter(NavLink)},
        ],
    },
    {
        value: "Pages",
        icon: "file",
        subItems: [
            {value: "Profile", to: "/profile", LinkComponent: withRouter(NavLink)},
            {value: "Login", to: "/login", LinkComponent: withRouter(NavLink)},
            {
                value: "Register",
                to: "/register",
                LinkComponent: withRouter(NavLink),
            },
            {
                value: "Forgot password",
                to: "/forgot-password",
                LinkComponent: withRouter(NavLink),
            },
            {value: "400 error", to: "/400", LinkComponent: withRouter(NavLink)},
            {value: "401 error", to: "/401", LinkComponent: withRouter(NavLink)},
            {value: "403 error", to: "/403", LinkComponent: withRouter(NavLink)},
            {value: "404;lk;lk;lk error", to: "/404", LinkComponent: withRouter(NavLink)},
            {value: "500 error", to: "/500", LinkComponent: withRouter(NavLink)},
            {value: "503 error", to: "/503", LinkComponent: withRouter(NavLink)},
            {value: "Email", to: "/email", LinkComponent: withRouter(NavLink)},
            {
                value: "Empty page",
                to: "/empty-page",
                LinkComponent: withRouter(NavLink),
            },
            {value: "RTL", to: "/rtl", LinkComponent: withRouter(NavLink)},
        ],
    },
    {
        value: "Forms",
        to: "/form-elements",
        icon: "check-square",
        LinkComponent: withRouter(NavLink),
    },
    {
        value: "Gallery",
        to: "/gallery",
        icon: "image",
        LinkComponent: withRouter(NavLink),
    },
    {
        icon: "file-text",
        value: "Documentation",
        to:
            process.env.NODE_ENV === "production"
                ? "https://tabler.github.io/tabler-react/documentation"
                : "/documentation",
    },
];

const accountDropdownProps = {
    avatarURL: "./demo/faces/female/25.jpg",
    name: "Jane Pearson",
    description: "Administrator",
    options: [
        {icon: "user", value: "Profile"},
        {icon: "settings", value: "Settings"},
        {icon: "mail", value: "Inbox", badge: "6"},
        {icon: "send", value: "Message"},
        {isDivider: true},
        {icon: "help-circle", value: "Need help?"},
        {icon: "log-out", value: "Sign out"},
    ],
};

class SiteWrapper extends React.Component<Props, State> {
    state = {
        notificationsObjects: [
            {
                unread: true,
                avatarURL: "demo/faces/male/41.jpg",
                message: (
                    <React.Fragment>
                        <strong>Nathan</strong> pushed new commit: Fix page load performance
                        issue.
                    </React.Fragment>
                ),
                time: "10 minutes ago",
            },
            {
                unread: true,
                avatarURL: "demo/faces/female/1.jpg",
                message: (
                    <React.Fragment>
                        <strong>Alice</strong> started new task: Tabler UI design.
                    </React.Fragment>
                ),
                time: "1 hour ago",
            },
            {
                unread: false,
                avatarURL: "demo/faces/female/18.jpg",
                message: (
                    <React.Fragment>
                        <strong>Rose</strong> deployed new version of NodeJS REST Api // V3
                    </React.Fragment>
                ),
                time: "2 hours ago",
            },
        ],
    };

    render(): React.Node {
        const notificationsObjects = this.state.notificationsObjects || [];
        const unreadCount = this.state.notificationsObjects.reduce(
            (a, v) => a || v.unread,
            false
        );
        return (
            <Site.Wrapper
                headerProps={{
                    href: "/",
                    alt: "Easy Trip",
                    imageURL: "./demo/brand/tabler.svg",
                    notificationsTray: {
                        notificationsObjects,
                        markAllAsRead: () =>
                            this.setState(
                                () => ({
                                    notificationsObjects: this.state.notificationsObjects.map(
                                        v => ({...v, unread: false})
                                    ),
                                }),
                                () =>
                                    setTimeout(
                                        () =>
                                            this.setState({
                                                notificationsObjects: this.state.notificationsObjects.map(
                                                    v => ({...v, unread: true})
                                                ),
                                            }),
                                        5000
                                    )
                            ),
                        unread: unreadCount,
                    },
                    accountDropdown: accountDropdownProps,
                }}
                navProps={{itemsObjects: navBarItems}}
                routerContextComponentType={withRouter(RouterContextProvider)}
                footerProps={{
                    copyright: (
                        <React.Fragment>
                            Copyright © 2021 EasyTrip All rights reserved.
                        </React.Fragment>
                    ),
                }}
            >
                {this.props.children}
            </Site.Wrapper>
        );
    }
}

export default SiteWrapper;
