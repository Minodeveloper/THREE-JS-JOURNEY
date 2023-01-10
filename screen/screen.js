const bodys = document.querySelector('body');
const row0 = document.querySelector('#one')

for(let i = 0; i < 90; i++)
{
    bodys.insertAdjacentHTML('beforeend', `<div class="row0"></div>`)
    // console.log(row0)
}

for(let i = 0; i < 120; i++)
{
    row0.insertAdjacentHTML('beforeend',`<div class="pixel"></div>`)
}