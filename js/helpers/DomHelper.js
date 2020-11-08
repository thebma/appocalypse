function DomHelper_GuarenteeElementById(id)
{
    let element = document.getElementById(id);

    if(!element) {
        console.error(`Guarentee element failed for ${id}`);
    }

    return element;
}

function DomHelper_RemoveChildrenById(element, id)
{
    let totalDeletionCount = 0;
    let deletionCount = 0;

    do 
    {
        deletionCount = 0;

        for(let i = 0; i < element.childNodes.length; i++)
        {
            let childNode = element.childNodes[i];

            if(childNode.id == id) 
            {
                element.removeChild(childNode)
                deletionCount++;
                totalDeletionCount++;
            }
        }
    }while(deletionCount > 0)


    return totalDeletionCount;
}

function DomHelper_RemoveChildren(element) 
{
    let totalDeletionCount = 0;
    let deletionCount = 0;

    
    do
    {
        deletionCount = 0;
        
        for(let i = 0; i < element.childNodes.length; i++)
        {
            let childNode = element.childNodes[i];
            element.removeChild(childNode)
            deletionCount++;
            totalDeletionCount++;
        }
    }
    while(deletionCount > 0) 

    return totalDeletionCount;
}