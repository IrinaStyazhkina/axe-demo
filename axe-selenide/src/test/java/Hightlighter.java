import com.codeborne.selenide.SelenideElement;
import com.codeborne.selenide.WebDriverRunner;
import com.deque.html.axecore.results.CheckedNode;
import com.deque.html.axecore.results.Results;
import com.deque.html.axecore.results.Rule;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Maps;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.ByteArrayInputStream;
import java.util.*;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.executeJavaScript;

public class Hightlighter {
    private List<SelenideElement> els = new ArrayList<>();
    private int globalCounter = 0;

    public void highlightElements(Results data) {
        for (Rule item : data.getViolations()) {
            for (CheckedNode node : item.getNodes()) {
                String selector = node.getTarget().toString();
                String substring = selector.substring(1, selector.length() - 1);
                els.add($(substring));
            }
        }
        for (SelenideElement el : els) {
            highlightElement(++globalCounter, el, Impact.CRITICAL);
        }
        Allure.addAttachment(
                "problems on screen",
                new ByteArrayInputStream(
                        takeScreenshot(WebDriverRunner.getWebDriver()))
        );
        removeHighlights();
    }

    public void removeHighlights() {
        for (SelenideElement el : els) {
            executeJavaScript("arguments[0].style.border='none'", el);
        }
        executeJavaScript("document.querySelectorAll('.violations-index').forEach(el => el.remove());");
    }

    private void highlightElement(int index, SelenideElement element, Impact impact) {
        executeJavaScript("arguments[0].style.border='2px solid red'", element);
        executeJavaScript("arguments[0].setAttribute('data-index', arguments[1])", element, index);
        executeJavaScript("arguments[0].innerHTML = arguments[0].innerHTML + '<span class=\"violations-index\" style=\"background-color: red; color: black; position: absolute;\">" + index + "</span>'", element);
    }

    private String getImpactColor(Impact impact) {
        switch (impact) {
            case CRITICAL:
                return "#da1e28";
            case SERIOUS:
                return "#ff832b";
            case MODERATE:
                return "#f1c21b";
            case MINOR:
                return "#add8e6";
            default:
                throw new IllegalArgumentException("Unknown impact");
        }
    }

    private byte[] takeScreenshot(WebDriver driver) {
        if(driver instanceof ChromeDriver dr) {
            Map<String, Object> layoutMetrics = ((ChromeDriver) driver).executeCdpCommand("Page.getLayoutMetrics", Collections.emptyMap());
            Map<String, Object> screenshotConfig = Maps.newHashMap();
            screenshotConfig.put("captureBeyondViewport", true);
            screenshotConfig.put("fromSurface", true);
            Map contentSize = (Map)layoutMetrics.get("cssContentSize");
            screenshotConfig.put("clip", ImmutableMap.of(
                    "width", contentSize.get("width"),
                    "height", contentSize.get("height"),
                    "x", 0,
                    "y", 0,
                    "scale", 0.5
            ));
            Map<String, Object> res = ((ChromeDriver) driver).executeCdpCommand("Page.captureScreenshot", screenshotConfig);
            return Base64.getDecoder().decode(res.get("data").toString());
        }
        throw new RuntimeException("Only supprted for ChromeDriver");
    }
}
