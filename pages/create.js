import Container from '@material-ui/core/Container';
import { Checkbox } from '../components/Checkbox'

const items = ['da/nu', 'number', 'text']

export default function Create() {
    const [tags, setTags] = React.useState([])


    const handleTagChange = (tag, checked, multiple = false) => {
        // if the same tag is clicked again, remove it 
        if (tags.includes(tag)) {
            const checkedTags = tags.filter(t => t !== tag)
            console.log(checkedTags)
            if (id === 'domeniu') {
                setTags(checkedTags)
                if (!checkedTags.length) {
                    setQueried(false)
                }
                setQuery({
                    [id]: checkedTags
                })
            } else {
                setTags(checkedTags)
                setQuery(values => ({
                    ...values,
                    [id]: checkedTags
                }))
            }
        } else {
            // if the filter is suppossed to hold multiple clicked tags at once
            if (multiple) {
                const nextSelectedTags = checked ? [...tags, tag] : selectedOpTags.filter(t => t !== tag);
                setTags(nextSelectedTags);
                setQuery(values => ({
                    ...values,
                    [id]: nextSelectedTags
                }))
            } else {
                // if the filter is holding only one tag
                const nextSelectedTags = checked ? [tag] : selectedOpTags.filter(t => t !== tag);
                setTags(nextSelectedTags);
                setQuery(values => ({
                    ...values,
                    [id]: tag
                }))
            }
            setQueried(true)
        }
    }
    return (
        <>
            <Container maxWidth="sm">
                <h1> Add a track </h1>
                <p>type of answer - checkbox</p>
                {items.map(item => {
                    return (
                        <Checkbox key={item} type='checkbox'
                            checked={tags.indexOf(item) > -1}
                            tag={item}
                            onChange={checked => handleTagChange(item, checked)}
                        />
                    )
                })}
                <p>whata do u want to track - input</p>
                <p>frecventa</p>
                <p>in ce zile ? - checkbox</p>
                <p>de cate ori doriti pe zi? - checkbox</p>
                <p>selecteaza ora - select</p>
                <p> set finish date</p>
                <button>create track</button>
            </Container>
        </>
    )
}