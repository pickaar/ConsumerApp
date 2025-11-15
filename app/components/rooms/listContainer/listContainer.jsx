import { SingleLine, MultiLine, MultiLineWithInfo, WrapperItem } from "../../brick/listItems";

export default ListContainer = ({ list }) => {
    const _list = list;

    return (_list).map((item, index) => {
        if (item.type == 'singleLine')
            return (<SingleLine key={index} item={item} index={index} />)

        if (item.type == 'multiLine')
            return (<MultiLine key={index} item={item} index={index} />)

        if (item.type == 'multiLineWithInfo')
            return (<MultiLineWithInfo key={index} item={item} index={index} />)

    })

}

