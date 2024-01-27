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
            <div className="input-group mb-3">
                <input type="file" className="form-control" id="inputGroupFile02" />
                <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
            </div>
        </form>
    );
};

export default FeatureForm;