class Node{
  constructor(tag,{classes,...arg}){
    this.tag = tag
    this.class = classes || [];
    this.custom = arg;
  }

  build = () => {
    const node = document.createElement(this.tag);

    this.class.forEach(cl => {
      node.classList.add(cl);
    });

    node.innerText = this.text || "";

    
    for (const [key, value] of Object.entries(this.custom)) {
      if(key=="dataset"){
        for (const [key1, value1] of Object.entries(value)) {
          node.dataset[key1] = value1
        }
      }else{
        node[key] = value
      }
    }

    return node;
  }
}