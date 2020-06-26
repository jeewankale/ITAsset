import React, {  } from "react";
const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		console.log("Key pressed",event.key)
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => event.key==="Enter" ? addTags(event) : console.log("enter pressed",event.key) }
				placeholder="Press enter to add tags"
			/>
		</div>
	);
};

// const App = () => {
// 	const selectedTags = tags => {
// 		console.log(tags);
// 	};
// 	return (
// 		<div className="App">
// 			<TagsInput selectedTags={selectedTags}  tags={['Nodejs', 'MongoDB']}/>
// 		</div>
// 	);
// };
 export default TagsInput;