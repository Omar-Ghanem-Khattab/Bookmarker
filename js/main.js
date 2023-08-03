var siteNameInp = document.getElementById('siteName');
var siteUrlInp = document.getElementById('siteUrl');
var bookmarksShelf= [];
var storageSites = 'sites';


//SECTION -  Local Storage

if (localStorage.getItem(storageSites)!= null)
{
    bookmarksShelf =JSON.parse( localStorage.getItem(storageSites));
    displaySites(bookmarksShelf);
}
function saveInStorage() {
    localStorage.setItem(storageSites, JSON.stringify(bookmarksShelf));
}

//SECTION - Validation
function validatesiteName() 
{
    var regex = /[A-Za-z]{3,8}$/;
    if (regex.test(siteNameInp.value)) 
    {
        siteNameInp.style.border='3px solid green'
        document.getElementById('validation').classList.remove('invalid');
        document.getElementById('validation').classList.add('valid');
        return true;
    } else 
    {
        siteNameInp.style.border='3px solid red'
        document.getElementById('validation').classList.add('invalid');+
        document.getElementById('validation').classList.remove('valid');
        return false;
    }
}

function validateSiteURL() {
    regex= /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
    if (regex.test(siteUrlInp.value)==true)  
     {
        siteUrlInp.style.border='3px solid green'
        document.getElementById('urlValidation').classList.remove('urlinvalid');
        document.getElementById('urlValidation').classList.add('urlvalid');
        return true;
    } else 
    {
        siteUrlInp.style.border='3px solid red'
        document.getElementById('urlValidation').classList.add('urlinvalid');
        document.getElementById('urlValidation').classList.remove('urlvalid');
        return false;
    }
}


function foundExistedItem() 
{   
for(var i = 0 ;i<bookmarksShelf.length;i++)
{  
if (bookmarksShelf[i].siteName.includes(siteNameInp.value) ) 
{ 
    // duplicated
    document.getElementById("modalbutton").click();
return false ;
 
} else{
    return true;
}
}
}




//SECTION - Submit btn

function submitsites() 
{
    if(validatesiteName() && validateSiteURL() && foundExistedItem() )
    {
        var  sites =
{
    siteName:siteNameInp.value,
    siteURl:siteUrlInp.value
}
    bookmarksShelf.push(sites);
    displaySites(bookmarksShelf) ;
    saveInStorage();
    clearForm();
    } else  {
        document.getElementById("modalbutton").click();
    }

}

//SECTION - display sites

function displaySites(arr) 
{ 
    var cartoona =``;
    for(var i=0; i < arr.length;i++)
    { 
        if (arr[i].siteURl.includes('http')||arr[i].siteURl.includes('https') ) 
        {
    cartoona += `<tr>
    <td>${i + 1 }</td>
    <td>${arr[i].siteName}</td>
    <td>  <a href="${arr[i].siteURl}"  target="_blank"  class="btn btn-success btn-sm"><span class="pe-1"><i class="fa-solid fa-eye"></i></span>Visit</a> </td>
    <td>  <button onclick="deletesites(${i});" class="btn btn-danger btn-sm"><span class="pe-1"><i class="fa-solid fa-trash"></i></span>Delete</button> </td>             
        </tr>`;
    } else {
        cartoona += `<tr>
        <td>${i + 1 }</td>
        <td>${arr[i].siteName}</td>
        <td>  <a href="http://${arr[i].siteURl}"  target="_blank"  class="btn btn-success btn-sm"><span class="pe-1"><i class="fa-solid fa-eye"></i></span>Visit</a> </td>
        <td>  <button onclick="deletesites(${i});" class="btn btn-danger btn-sm"><span class="pe-1"><i class="fa-solid fa-trash"></i></span>Delete</button> </td>             
            </tr>`;
    }
    }
    document.getElementById('tBody').innerHTML = cartoona;
};

//SECTION - Clear Form

function clearForm() 
{
    siteNameInp.value ='';
    siteUrlInp.value ='';
    
};


//SECTION - Delete btn

function deletesites(sitesindex) 
{
    bookmarksShelf.splice(sitesindex,1);
    saveInStorage();
    displaySites(bookmarksShelf);
};











