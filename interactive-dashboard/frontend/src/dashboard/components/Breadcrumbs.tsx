interface BreadcrumbsProps {
    mainPage: string;
    parentPage: string;
    onClickMainPage?: () => void;
    onClickParentPage?: () => void;
}

export default function Breadcrumbs(breadCrumbsProps: BreadcrumbsProps) {
    return (
        <div className="bg-white p-4 flex items-center flex-wrap">
            <ul className="flex items-center">
                <li className="inline-flex items-center">
                    <a
                        href="#"
                        className="text-gray-600 hover:text-slider"
                        onClick={(e) => {
                            e.preventDefault();
                            breadCrumbsProps.onClickMainPage?.();
                        }}
                    >
                        <svg
                            className="w-5 h-auto fill-current mx-2 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000000"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
                        </svg>
                    </a>

                    <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                </li>

                <li className="inline-flex items-center">
                    <a
                        href="#"
                        className="text-gray-600 hover:text-slider"
                        onClick={(e) => {
                            e.preventDefault();
                            breadCrumbsProps.onClickParentPage?.();
                        }}
                    >
                        {breadCrumbsProps.parentPage}
                    </a>

                    <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                </li>

                <li className="inline-flex items-center">
                    <a
                        href="#"
                        className="text-gray-600 hover:text-slider"
                        onClick={(e) => {
                            e.preventDefault();
                            breadCrumbsProps.onClickMainPage?.();
                        }}
                    >
                        {breadCrumbsProps.mainPage}
                    </a>
                </li>
            </ul>
        </div>
    );
}
