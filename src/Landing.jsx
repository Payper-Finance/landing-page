import React, { useState, useEffect } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import "./landingcss.css";
import { getAccount, connectWallet, disconnectWallet } from "./utils/wallet";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import qs from "qs";

var words = ["defi", "derivative", "trading"],
  part,
  i = 0,
  offset = 0,
  len = words.length,
  forwards = true,
  skip_count = 0,
  skip_delay = 15,
  speed = 80;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      } else {
        offset--;
      }
    }
    $(".word").text(part);
  }, speed);
};

$(document).ready(function () {
  wordflick();
});

export default function Landing() {
  const [toggle, setTogle] = useState(false);
  const [show, setShow] = useState(false);
  const [popup, setpopup] = useState(false);
  const [walletaddress, setWalletaddress] = useState("");
  const [succsess, setSuccess] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Submit");
  useEffect(() => {
    (async () => {
      const accounts = await getAccount();
      setWalletaddress(accounts);
    })();
  }, []);

  const connectwallet = async () => {
    await connectWallet();
    const accounts = await getAccount();
    setWalletaddress(accounts);
  };
  const disconnectwallet = async () => {
    await disconnectWallet();
    setWalletaddress("");
    setpopup(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    const registered = {
      email: e.target.email.value,
      wallet: e.target.wallet.value,
      discordId: e.target.discordId.value,
      telegramId: e.target.telegramId.value,
    };
    setSubmitBtn("Adding to Waitlist");
    await axios
      .post("https://ggbackend.herokuapp.com/api/post", registered)
      .then((res) => {
        if (res.data == "user Exist") {
          alert("You are already submitted with email or wallet address!");
        } else {
          setSuccess(true);
          setShow(false);
        }
      })
      .catch((err) => {
        alert("Opps! some err, please try again");
        setShow(false);
      });
  };

  return (
    <div className="Landing_body">
      <section className="Landing_navbar item">
        <div
          style={{ zIndex: 5 }}
          id="menuToggle"
          onClick={() => setTogle(toggle ? false : true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <h2>ZENITH</h2>
        </div>
        <ul style={{ zIndex: 2 }} id={`${toggle ? "menu" : ""}`}>
          <li>Future </li>
          <li>Options</li>
          <li>Staking</li>
          <li>
            <a
              href="https://payper-finance.gitbook.io/zenith-1/"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", color: "white" }}
            >
              Docs
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/DMVS3mWpaN"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", color: "white" }}
            >
              Support
            </a>
          </li>
        </ul>
        <div
        >
          

          {walletaddress == "" ? (
            <Button style={{ zIndex: "2" }} onClick={connectwallet}>
              {" "}
              Connect Wallet
            </Button>
          ) : (
            <Button  className="disconnectbutton"  style={{ zIndex: "2" }} onClick={() => setpopup(true)}>
              {walletaddress.substring(0, 15)}...
            </Button>
          )}
{popup ? (
            <div
              style={{
                position: "absolute",
                width: "auto",
                marginTop:"2px",
                right:"3.1%",
                zIndex: "3",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "auto",
                  zIndex: "3",
                }}
              className="popoverconnectbtn"

              >
                <Button
                  style={{ padding: "5px"}}
                  onClick={() =>
                    navigator.clipboard
                      .writeText(walletaddress)
                      .then((res) => setpopup(false))
                  }
                >
                  copy address
                </Button>
                <Button onClick={disconnectwallet} style={{ padding: "5px" }}>
                  Disconnect
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}
          </div>
      </section>
      <span className="home_star">
        <img src="img/star-img.png" />
      </span>
      <span className="Topleftsphere"> </span>
      <span className="Homerightsphere glow"> </span>

      <section className="Landing_main ">
        <div className="HomeContent">
          <div>
            <h1>
              We make <span style={{ color: "rgba(223, 0, 248, 1)" }}>#</span>
              <span style={{ color: "rgba(223, 0, 248, 1)" }} className="word">
                defi
              </span>{" "}
              <br /> clear and simple
            </h1>
          </div>
          <div>
            <h4>
              Your first perpetual derivaties platform using Virtual Market
              Maker (VMM)on Tezos by Payper Finance
            </h4>
          </div>
          <div>
            <Button /*onClick={() => setShow(true)}*/><a style={{textDecoration:"none",color:"white"}} href="https://trade.zenith.payperfi.com/">Trade Now</a></Button>
          </div>
        </div>
        <div className="homeLogo">
          <img src="img/LogoHome.png" />
        </div>
      </section>

      {/* popup */}
      {show ? (
        walletaddress == "" ? (
          alert("First Connect Your Wallet")
        ) : (
          <div className="Popover">
            <div className="popoverdiv">
              <form onSubmit={submit}>
                <h2>Get Whitelisted Here </h2>
                <button
                  onClick={() => setShow(false)}
                  style={{
                    position: "absolute",
                    background: "none",
                    top: "5px",
                    right: "-40px",
                  }}
                >
                  <img
                    style={{ width: "20px" }}
                    src="img/icons8-close-30.png"
                  />
                </button>
                <div>
                  <label>Email</label>
                  <input
                    placeholder="email"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                {walletaddress == "" ? (
                  <div>
                    <label>Wallet</label>
                    <input
                      placeholder="Wallet Address"
                      name="wallet"
                      type="text"
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label>Wallet</label>
                    <input
                      placeholder={`${walletaddress}`}
                      name="wallet"
                      type="text"
                      value={walletaddress}
                      readOnly
                    />
                  </div>
                )}

                <div>
                  <label>Discord</label>
                  <input
                    placeholder="Discord Username"
                    name="discordId"
                    type="text"
                  />
                  <a
                    href="https://discord.gg/DMVS3mWpaN"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button>Join</Button>
                  </a>
                </div>
                <div>
                  <label>Telegram</label>
                  <input
                    placeholder="Telegram Username"
                    name="telegramId"
                    type="text"
                  />
                  <a
                    href="https://t.me/Payper_Finance"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button>Join</Button>
                  </a>
                </div>
                <button type="submit">{submitBtn}</button>
              </form>
            </div>
          </div>
        )
      ) : (
        ""
      )}
      {!succsess ? (
        ""
      ) : (
        <div className="Popover">
          <div className="popoverdiv">
            <button
              onClick={() => setSuccess(false)}
              style={{
                position: "absolute",
                background: "none",
                top: "5px",
                right: "0px",
              }}
            >
              <img style={{ width: "20px" }} src="img/icons8-close-30.png" />
            </button>
            <div>
              <h2>Please! Join the Discord server and Telegram channel</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0",
                }}
              >
                <a
                  href="https://t.me/Payper_Finance"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img //Telegram
                    style={{ width: "70px", height: "70px" }}
                    src="img/pngegg (1).png"
                  />
                </a>

                <a
                  href="https://discord.gg/DMVS3mWpaN"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img //Discord
                    style={{ width: "60px", height: "60px", marginTop: "5px" }}
                    src="img/discord.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="Landing_details_downcards scrollFade">
        <div>
          <div className="each_cards">
            <img src="img/card1.png" />
            <h3>Future</h3>
            <p>
              Trade Perpetual future In XTZ,BTC,ETH without worrying about
              liquidity
            </p>
            <a href="https://trade.zenith.payperfi.com/" >
              Get Started <img src="img/Stroke1.png" />
            </a>
          </div>
          <div className="each_cards">
            <img src="img/card2.png" />
            <h3>VMM</h3>
            <p>
              A VMM model has higher capital efficiency and is most suitable for
              under-collateralized derivative products as compared to the AMM
              model.
            </p>
            <a href="https://trade.zenith.payperfi.com/">
            Get Started  <img src="img/Stroke1.png" />
            </a>
          </div>
          <div className="each_cards">
            <img src="img/card3.png" />
            <h3>Staking</h3>
            <p>
              Stake our Token and earn constant APY irrespective of market
              volatality,alsoearn bonus tokens for staking certain period of
              time.
            </p>
            <a >
            Coming soon <img src="img/Stroke1.png" />
            </a>
          </div>
          <span style={{ position: "absolute", right: "0", marginTop: "10%" }}>
          <img src="img/bg-img.png" />
        </span>
        </div>
      </div>

      {/* <section className="Landing_cards scrollFade">
        <div className="Landing_cards_head">
          <h2>
            STEPS TO GET{" "}
            <span style={{ color: "rgba(223, 1, 249, 1)" }}>WHITELISTED</span>{" "}
            ON TESTNET
          </h2>
          <p>Only first 100 users will get whitelisted for phase-1</p>
        </div>
        <div style={{ height: "280px" }} className="each_cards">
          <img src="img/card1.png" />
          <h3>Step-1</h3>
          <p>Click on whitelist now Connect you wallet</p>
          <a href="https://trade.zenith.payperfi.com/">
          Trade Now <img src="img/Stroke1.png" />
          </a>
        </div>
        <div style={{ height: "280px" }} className="each_cards">
          <img src="img/card2.png" />
          <h3>Step-2</h3>
          <p>Enter your valid email, Discor id,telegram id</p>
    
        </div>
        <div style={{ height: "280px" }} className="each_cards">
          <img src="img/card3.png" />
          <h3>Step-3</h3>
          <p>
            Click on submit and join our discord and telegram to know next
            announcement
          </p>
        </div>

        <span style={{ position: "absolute", right: "0", marginTop: "10%" }}>
          <img src="img/bg-img.png" />
        </span>
        <div className="Landing_cards_details ">
          <h3>
            Benifits and rewards for joining{" "}
            <span style={{ color: "rgba(223, 1, 249, 1)" }}>WHITELISTED</span>
          </h3>
          <ul>
            <li>1. Successful whitelisted will get 10 PPR Token.</li>
            <li>2. Taking a trade you can earn 2 PPR Token.</li>
            <li>
              3. At end of each day top 5 profitable traders get 50 PPR token.
            </li>
            <li>4. If position gets liquidated you get 1 PPR Token.</li>
            <li>
              5. Reporting bug to the team you can earn 50 to 1000 PPR tokens.
            </li>
          </ul>
        </div>
      </section> */}

      <span style={{ position: "absolute", left: "15%" }}>
        <img src="img/star-img.png" />
      </span>
      <span style={{ position: "absolute", left: "8%" }}>
        <img
          style={{ height: "50px", width: "50px" }}
          src="img/star-img2.png"
        />
      </span>

      <section className="Landing_start scrollFade">
        <div>
          <h2>
            Trade and grow your crypto with{" "}
            <span style={{ color: "rgba(223, 0, 248, 1)" }}>Zenith</span>,
            <br />
            the platform dedicated to every trader at every level.
          </h2>
          <h4>
            Start trading perpetual futures using VMM on Zenith with as low as 1
            ꜩ
          </h4>
          <Button ><a style={{textDecoration:"none",color:"white"}} href="https://trade.zenith.payperfi.com/">Trade Now</a></Button>
        </div>
      </section>
      <section className="Landing_details scrollFade">
        <div className="details_image">
          <span className="landingdetails_sphere1 glow"></span>
          <img src="img/ldlogo.png" />
        </div>
        <div className="landing_details_content">
          <div>
            <h1>Completely decentralized on-chain trading platform</h1>
            <h4>
              This will provide higher leverage and a less manipulative market
              and slippage.
            </h4>
            <Button ><a style={{textDecoration:"none",color:"white"}} href="https://trade.zenith.payperfi.com/">Trade Now</a></Button>
          </div>
        </div>
      </section>
     

      <section className="Landing_charts scrollFade">
        <div className="Landing_charts_content">
          <span className="landingdetails_sphere2 glow"></span>
          <h1>Buy and sell with the lowest fees in the industry</h1>
          <h4>
            New users can start trading with as less as 1 ꜩ using stable coins,
            without being exposed to volatility in the market.{" "}
          </h4>
          <a>
            Learn More <img src="img/Stroke1.png" />
          </a>
        </div>
        <div className="Landing_charts_chart">
          <hr />
          <hr />
          <ul>
            <li>Tezos</li>
            <li style={{ color: "#B982FF" }}>XTZ</li>
            <li>$1.88</li>
            <li style={{ color: "#0DBB7C" }}>+3.43%</li>
            <li>
              <img src="img/Vector 460.png" />
            </li>
            <li style={{ display: "inline-block" }}>
              Trade Now{" "}
              <img style={{ marginLeft: "10px" }} src="img/Strokew.png" />
            </li>
          </ul>
          <ul>
            <li>Bitcoin</li>
            <li style={{ color: "#B982FF" }}>BTC</li>
            <li>$56,290.30</li>
            <li style={{ color: "#0DBB7C" }}>+1.43%</li>
            <li>
              <img src="img/Vector 461.png" />
            </li>
            <li style={{ display: "inline-block" }}>
              Coming soon
              <img style={{ marginLeft: "10px" }} src="img/Strokew.png" />
            </li>
          </ul>
          <ul>
            <li>Ethereum</li>
            <li style={{ color: "#B982FF" }}>ETH</li>
            <li>$4284.81</li>
            <li style={{ color: "#0DBB7C" }}>+4.43%</li>
            <li>
              <img src="img/Vector 462.png" />
            </li>
            <li style={{ display: "inline-block" }}>
              Coming soon
              <img style={{ marginLeft: "10px" }} src="img/Strokew.png" />
            </li>
          </ul>
          <hr />
          <hr />
        </div>
      </section>

      <section className="Landing_start2 scrollFade">
        <div className="Landing_start2_content">
          <div>
            <h1>
              Take your first step into safe, secure crypto derivatives trading
            </h1>
            <Button ><a style={{textDecoration:"none",color:"white"}} href="https://trade.zenith.payperfi.com/">Trade Now</a></Button>
          </div>
        </div>
        <div className="Landing_start2_image">
          <span className="Landing_start2_sphere2 glow"></span>

          <img src="img/bagimg.png" />
        </div>
      </section>

      <section className="Landing_join scrollFade">
        <div>
          <h2>Join us here for latest updates</h2>
          <h4>To keep up to date, join our Discord server</h4>
          <form
            action="https://discord.gg/DMVS3mWpaN"
            target="_blank"
            rel="noreferrer"
          >
            <Button type="submit">JOIN DISCORD</Button>
          </form>
        </div>
        <footer>
          <div>
            <img src="img/flogo.png" />
            <h2>ZENITH</h2>
          </div>
          <div>
            <ul>
              <li>
                <a
                  href="https://discord.gg/DMVS3mWpaN"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="img/discord.png" />
                </a>
              </li>
              <li>
                <a
                   href="https://payper-finance.gitbook.io/zenith-1/"
                   target="_blank"
                   rel="noreferrer"
                >
                  <img style={{borderRadius:"4px"}} src="img/gitbook.png" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/PayperFinance"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="img/pngegg.png" />
                </a>
              </li>
              <li>
                <a
                  href=" https://t.me/Payper_Finance"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="img/pngegg (1).png" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/payper-finance/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="img/linkdn.png" />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </section>

      <script src="./js/scrollfade-0.1.js"></script>
    </div>
  );
}

var fadeElements = document.getElementsByClassName("scrollFade");

function scrollFade() {
  var viewportBottom = window.scrollY + window.innerHeight;

  for (var index = 0; index < fadeElements.length; index++) {
    var element = fadeElements[index];
    var rect = element.getBoundingClientRect();

    var elementFourth = rect.height / 4;
    var fadeInPoint = window.innerHeight - elementFourth;
    var fadeOutPoint = -(rect.height / 1.5);

    if (rect.top <= fadeInPoint) {
      element.classList.add("scrollFade--visible");
      element.classList.add("scrollFade--animate");
      element.classList.remove("scrollFade--hidden");
    } else {
      element.classList.remove("scrollFade--visible");
      element.classList.add("scrollFade--hidden");
    }

    if (rect.top <= fadeOutPoint) {
      element.classList.remove("scrollFade--visible");
      element.classList.add("scrollFade--hidden");
    }
  }
}

document.addEventListener("scroll", scrollFade);
window.addEventListener("resize", scrollFade);
document.addEventListener("DOMContentLoaded", function () {
  scrollFade();
});
