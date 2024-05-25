import com.codeborne.selenide.WebDriverRunner;
import com.deque.html.axecore.results.Results;
import com.deque.html.axecore.selenium.AxeBuilder;
import io.qameta.allure.Allure;
import org.junit.jupiter.api.Test;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.open;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestExample {

    @Test
    public void testMyWebPage() {
        AxeBuilder axeBuilder = new AxeBuilder();
        open("https://finance.ozon.ru/");
        $("[data-testid='discount-section']").shouldBe(visible);

        Results axeResults = axeBuilder.analyze(WebDriverRunner.getWebDriver());
        AttachmentTemplateMaker attachmentTemplateMaker = new AttachmentTemplateMaker(axeResults);
        Allure.addAttachment(
                "acesssibility-scan-results",
                "text/html",
                attachmentTemplateMaker.generateTableAttachment(),
                ".html"
        );
        Hightlighter hightlighter = new Hightlighter();
        hightlighter.highlightElements(axeResults);
        assertEquals(0, axeResults.getViolations().size());
    }
}
