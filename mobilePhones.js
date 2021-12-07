const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let url = "https://www.amazon.in/mobile-phones/b/?ie=UTF8&node=1389401031&ref_=nav_cs_mobiles_9292c6cb7b394d30b2467b8f631090a7";
request(url, Callback);
let BrandName = [];
let BrandCount = 0;
let mobileCount = 0;
let count = 0;
function Callback(err, res, html) {
    const $ = cheerio.load(html);
    let brandUrlAnchorTags = $(".sl-sobe-carousel-viewport-row-inner .sl-sobe-carousel-sub-card-image");
    
    for(let i = 0;i< 10;i++){
        brandUrl = "https://www.amazon.in" + $(brandUrlAnchorTags[i]).attr("href");
        BrandName.push({
            brandUrl : brandUrl,
            mobileNames : []
        })
        
        // let allIphoneUrl = "https://www.amazon.in/stores/page/9505ACAA-EF13-4AE6-AB5E-F14749A7822E?ingress=0&visitId=1404884c-c1ea-41a6-8257-9b72b398ae56&lp_slot=auto-sparkle-hsa-tetris&store_ref=SB_A07317792XER6D27SELMO";
        // request(allIphoneUrl,fetchIphone.bind())
         request(brandUrl,fetchMobiles.bind(this,i))
        
    }

    
}
function fetchMobiles(index,err,res,html){
    BrandCount++;
    const $ = cheerio.load(html);
    // if(index == 5){
    //     let allIphoneUrl = "https://www.amazon.in/stores/page/9505ACAA-EF13-4AE6-AB5E-F14749A7822E?ingress=0&visitId=1404884c-c1ea-41a6-8257-9b72b398ae56&lp_slot=auto-sparkle-hsa-tetris&store_ref=SB_A07317792XER6D27SELMO";
    //     request(allIphoneUrl,fetchIphone.bind(this,index));
    // }
    

        let mobileNameUrlAnchorTags;    
    mobileNameUrlAnchorTags = $(".a-section.a-spacing-medium .a-size-base-plus.a-color-base.a-text-normal");
    if(mobileNameUrlAnchorTags.length == 0){
        mobileNameUrlAnchorTags = $("");   
    }
    let mobileUrlAnchorTags = $(".a-link-normal.s-no-outline");
    count += mobileNameUrlAnchorTags.length;
    for(let i = 0;i< mobileNameUrlAnchorTags.length;i++){
        mobileCount++;
        let mobileName =$(mobileNameUrlAnchorTags[i]).text();
        let mobileUrl = "https://www.amazon.in" + $(mobileUrlAnchorTags[i]).attr("href");
        BrandName[index].mobileNames.push({
            "mobileName" : mobileName,
            "mobileUrl" : mobileUrl,
        })
    }
    

     if(count == mobileCount && BrandCount == 10){
         fs.writeFileSync("temp.json", JSON.stringify(BrandName));  
     }
}

function fetchIphone(err,res,html){
    const $ = cheerio.load(html);
    //let iphoneNameAnchorTags = $("");
    let iphoneUrlAnchorTags = $("ProductGridItem__itemOuter__5ow0w ProductGridItem__fixed__1w9d4");
    count += iphoneUrlAnchorTags.length;
    for(let i = 0;i< iphoneUrlAnchorTags.length;i++){
        let iphoneUrl = "https://www.amazon.in" + $(iphoneUrlAnchorTags[i]).attr("href");
        count++;
        console.log(iphoneUrl);
        BrandName[5].mobileNames.push({
            "mobileName" : "",
            "mobileUrl" : iphoneUrl,
        })
    }

}