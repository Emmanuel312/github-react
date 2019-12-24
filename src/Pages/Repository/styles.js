import styled from 'styled-components'

export const Loading = styled.div`
    color: #FFF;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img
    {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }
    
    h1
    {
        font-size: 24px;
        margin-top: 10px;
    }

    p
    {
        margin-top: 5px;
        font-size: 14px;
        color: #555;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }

    a
    {
        text-decoration: none;
        color: #7159c1;
        font-size: 16px;
    }
`


export const SearchWrapper = styled.div`
    padding: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;

`

export const Search = styled.input.attrs(
{
    type: "text",
    placeholder: "Pesquise as issues pelo status Ex: all, open, closed"
})`
    padding: 10px;
    flex: 1;
    border-radius: 10px;
    border: 1px solid #eee;
    font-size: 12px;
    max-width: 500px;

    ::placeholder
    {
        color: #999;
    }
`
export const IssuesListLoading = styled.div`
    padding-top: 30px;
    border-top: 1px solid #eee;
`


export const IssuesList = styled.ul`
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li
    {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li
        {
            margin-top: 10px;
        }

        img
        {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div
        {
            flex: 1;
            margin-left: 15px;

            strong
            {
                font-size: 15px;

                a
                {
                    text-decoration: none;
                    color: #333;

                    &:hover
                    {
                        color: #7159c1
                    }
                }

                span
                {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;
                }
            }

            p
            {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }

    }
`

export const PageFooter = styled.footer`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

`
export const PageButton = styled.button.attrs( props => (
{
    size: 14,
    disabled: props.isInitialPage
}))`
    color: #7159c1;
    background: #fff;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &[disabled]
    {
        cursor: not-allowed;
        opacity: 0.6;
    }
`
