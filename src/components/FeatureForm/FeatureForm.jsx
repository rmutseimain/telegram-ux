import React from "react";
import Features from "../Features/Features";

const FeatureForm = (props) => {
    const { questionList } = props;

    return (
        <form>
            {questionList.map( item => {
                return <Features question={item} key={item.id} />
            })
            }
        </form>
    );
};

export default FeatureForm;