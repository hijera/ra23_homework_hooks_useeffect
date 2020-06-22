import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import '../css/bootstrap.css';

Details.propTypes = {
    itemId: PropTypes.number
};

function Details(props) {
    const { itemId } = props;
    const [content, setContent] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!itemId) return;
            setLoading(true);
            try {

                const response = await fetch(process.env.REACT_APP_DATA_URL.replace("{id}", itemId), {});

                if (!response.ok) {
                    setError(response.statusText);
                }
                const data = await response.json();
                const timestamp = new Date().getTime();
                if (data.avatar) {
                    data.avatar = data.avatar + "?t=" + timestamp;
                }
                setContent(data);
                setError(null);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [itemId]);

    const loadingBlock = <div className="loading-img"><p>Loading...</p></div>

    return (
    <>
        {hasError && <div>Error: {hasError.message}</div>}
        {itemId &&
        <div className="col-md-5">
            <div className={'card'}>
                {isLoading && loadingBlock}
                {(content.avatar && !isLoading) ?
                    <img alt={content.name} className={"avatar-img card-img-top"} src={content.avatar}/> : null}
                {!isLoading && <h4 className="offset">{content.name}</h4>}
                <span className="infopanel">
                    {!isLoading && content.details && content.details.city &&
                    <div className="list-group-item"><h5>City: {content.details.city}</h5></div>}
                    {!isLoading && content.details && content.details.company &&
                    <div className="list-group-item"><h5>Company: {content.details.company}</h5></div>}
                    {!isLoading && content.details && content.details.position &&
                    <div className="list-group-item"><h5>Position: {content.details.position}</h5></div>}
                </span>
            </div>
        </div>
        }
    </>
    );
}

Details.defaultProps = {
  itemId: null
};

export default Details;