import {Story} from "../types";
import StoriesList from "./StoriesList";
import {Link} from "react-router-dom";

interface StoriesListWrapperProps {
    stories: Story[];
    showAll: boolean;
    maxVisible: number;
}

const StoriesListWrapper: React.FC<StoriesListWrapperProps> = ({ stories, showAll, maxVisible }) => {
    if (!stories || stories.length === 0) {
        return null; // Don't render if stories array is empty or undefined
    }
    return <StoriesList stories={stories} showAll={showAll} maxVisible={maxVisible}/>;
};

export default StoriesListWrapper;